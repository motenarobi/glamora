<?php
header("Content-Type: application/json");

// 1. Get data from frontend
$data = json_decode(file_get_contents("php://input"));
$phone = $data->phone;
$amount = $data->amount;
$order_id = $data->order_id;

// 2. Generate Access Token (from Daraja API)
$consumer_key = "96EjHCjzDzwjkI9F6YYl5d8YVghOkZ85xDCJQJjeR0ZaYcWy";
$consumer_secret = "4OOmzTlNPhstlW8hbgD3CC73A4aZ1Yjkir7Go4oBAJc7pFZHsBQ36AwRTiLTAp9I";
$credentials = base64_encode("$consumer_key:$consumer_secret");

$token_url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
$token_response = file_get_contents($token_url, false, stream_context_create([
  "http" => ["header" => "Authorization: Basic $credentials"]
]));
$access_token = json_decode($token_response)->access_token;

// 3. Trigger STK Push
$paybill = "174379";
$passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
$timestamp = date("YmdHis");
$password = base64_encode("$paybill$passkey$timestamp");

$stk_data = [
  "BusinessShortCode" => $paybill,
  "Password" => $password,
  "Timestamp" => $timestamp,
  "TransactionType" => "CustomerPayBillOnline",
  "Amount" => $amount,
  "PartyA" => $phone,
  "PartyB" => $paybill,
  "PhoneNumber" => $phone,
  "CallBackURL" => "https://yourdomain.com/callback.php",
  "AccountReference" => $order_id,
  "TransactionDesc" => "Glamora Purchase"
];

$stk_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
$stk_response = file_get_contents($stk_url, false, stream_context_create([
  "http" => [
    "header" => "Authorization: Bearer $access_token\r\nContent-Type: application/json",
    "method" => "POST",
    "content" => json_encode($stk_data)
  ]
]));

// 4. Return response to frontend
echo $stk_response;
?>