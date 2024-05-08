package com.example.exampreparation.Services

import com.example.exampreparation.Model.CreditCard

interface CreditCardService {
    suspend fun getCreditCards():List<CreditCard>
}