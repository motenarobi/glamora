<?php
header('Content-Type: application/json');

// Safaricom API credentials
$consumerKey = "YOUR_CONSUMER_KEY";
$consumerSecret = "YOUR_CONSUMER_SECRET";
$passkey = "YOUR_PASSKEY";
$shortcode = "YOUR_SHORTCODE"; // Till or Paybill number

// Get the request body
$requestBody = json_decode(file_get_contents('php://input'), true);
$phone = $requestBody['phone'];
$amount = $requestBody['amount'];
$orderId = $requestBody['order_id'];

// Generate timestamp
$timestamp = date('YmdHis');

// Generate password
$password = base64_encode($shortcode . $passkey . $timestamp);

// Get access token
$credentials = base64_encode($consumerKey . ':' . $consumerSecret);
$ch = curl_init('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials');
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Basic ' . $credentials]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$accessToken = json_decode($response)->access_token;

// Initiate STK Push
$stkPushUrl = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
$stkPushHeader = [
    'Authorization: Bearer ' . $accessToken,
    'Content-Type: application/json'
];

$stkPushBody = [
    'BusinessShortCode' => $shortcode,
    'Password' => $password,
    'Timestamp' => $timestamp,
    'TransactionType' => 'CustomerPayBillOnline',
    'Amount' => $amount,
    'PartyA' => $phone,
    'PartyB' => $shortcode,
    'PhoneNumber' => $phone,
    'CallBackURL' => 'https://your-domain.com/Backend/mpesa_callback.php',
    'AccountReference' => $orderId,
    'TransactionDesc' => 'Payment for order ' . $orderId
];

$ch = curl_init($stkPushUrl);
curl_setopt($ch, CURLOPT_HTTPHEADER, $stkPushHeader);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($stkPushBody));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$result = json_decode($response);

if (isset($result->ResponseCode) && $result->ResponseCode == 0) {
    echo json_encode([
        'success' => true,
        'message' => 'STK Push initiated successfully',
        'CheckoutRequestID' => $result->CheckoutRequestID
    ]);
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Failed to initiate STK Push'
    ]);
}
?> 