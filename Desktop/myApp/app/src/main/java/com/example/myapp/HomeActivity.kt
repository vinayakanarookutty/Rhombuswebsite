package com.example.myapp
import android.content.ContentValues.TAG
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.google.firebase.Firebase
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.auth
import com.google.firebase.firestore.firestore

class HomeActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.home)
        val db = Firebase.firestore
        val foodName=findViewById<EditText>(R.id.foodName)
        val foodDescription=findViewById<EditText>(R.id.foodDescription)
        val foodPrice=findViewById<EditText>(R.id.foodPrice)
        val btn=findViewById<Button>(R.id.AddFood)

        btn.setOnClickListener{

            val fdname=foodName.text.toString()
            val fdDes=foodDescription.text.toString()
            val fdprice=foodDescription.text.toString()
            // Create a new user with a first and last name
            val user = hashMapOf(
                "FoodName" to fdname,
                "FoodDescription" to fdDes,
                "foodPrice" to fdprice,
            )

// Add a new document with a generated ID
            db.collection("users")
                .add(user)
                .addOnSuccessListener { documentReference ->
                    Log.d(TAG, "DocumentSnapshot added with ID: ${documentReference.id}")
                }
                .addOnFailureListener { e ->
                    Log.w(TAG, "Error adding document", e)
                }

        }

        var i=Intent(this,RecyclerActivity::class.java)
        startActivity(i)


    }
}