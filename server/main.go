package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Contact struct {
	ID          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	FirstName   string             `json:"first_name,omitempty" bson:"first_name,omitempty"`
	LastName    string             `json:"last_name,omitempty" bson:"last_name,omitempty"`
	Phonenumber string             `json:"phone_number,omitempty" bson:"phone_number,omitempty"`
}

var client *mongo.Client

// Inserts a contact into the DB.
func CreatContact(res http.ResponseWriter, req *http.Request) {
	res.Header().Add("content-type", "application/json")
	var contact Contact
	json.NewDecoder(req.Body).Decode(&contact)
	collection := client.Database("aledContacts").Collection("contacts")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	_, err := collection.InsertOne(ctx, contact)
	if err != nil {
		res.WriteHeader(http.StatusInternalServerError)
		res.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	ListContact(res, req)
}

// Removes a contact from the DB.
func DeleteContact(res http.ResponseWriter, req *http.Request) {
	params := mux.Vars(req)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	fmt.Println(id, params)
	collection := client.Database("aledContacts").Collection("contacts")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	_, err := collection.DeleteOne(ctx, bson.M{"_id": id})
	if err != nil {
		res.WriteHeader(http.StatusInternalServerError)
		res.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	ListContact(res, req)
}

// Lists contacts.
func ListContact(res http.ResponseWriter, req *http.Request) {
	res.Header().Add("content-type", "application/json")
	var contacts []Contact
	collection := client.Database("aledContacts").Collection("contacts")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		res.WriteHeader(http.StatusInternalServerError)
		res.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var contact Contact
		cursor.Decode(&contact)
		contacts = append(contacts, contact)
	}
	if err := cursor.Err(); err != nil {
		res.WriteHeader(http.StatusInternalServerError)
		res.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	json.NewEncoder(res).Encode(contacts)
}

func main() {
	port := ":8080"
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	client, _ = mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
	r := mux.NewRouter()
	// r.Use(CORS) // Uncomment for development.
	fmt.Printf("Server running @ http://localhost%s\n", port)
	r.HandleFunc("/contact", CreatContact).Methods("POST")
	r.HandleFunc("/remove-contact/{id}", DeleteContact).Methods("DELETE")
	r.HandleFunc("/contacts", ListContact).Methods("GET")
	http.ListenAndServe(port, r)
}

// CORS Middleware function.
func CORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set headers.
		w.Header().Set("Access-Control-Allow-Headers:", "*")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "*")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		fmt.Println("ok")
		next.ServeHTTP(w, r)
		return
	})
}
