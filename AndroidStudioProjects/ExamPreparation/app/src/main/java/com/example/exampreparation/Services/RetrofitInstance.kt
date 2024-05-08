package com.example.exampreparation.Services

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object RetrofitInstance {
private val BASE_URL="https://663b6fb2fee6744a6ea1a1d7.mockapi.io/creditCard/CreditCard"
private val retrofit:Retrofit by lazy {
            Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build()

}
}