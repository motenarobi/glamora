<?php
$response = json_decode(file_get_contents("php://input"));

if ($response->ResultCode == 0) {
  // Payment success - update database
  $order_id = $response->AccountReference;
  $receipt = $response->MpesaReceiptNumber;
  
  // Example: UPDATE orders SET status='paid' WHERE id='$order_id';
  file_put_contents("mpesa_logs.txt", "Order $order_id paid. Receipt: $receipt", FILE_APPEND);
}

// Acknowledge Safaricom
header("Content-Type: application/json");
echo json_encode(["ResultCode" => 0, "ResultDesc" => "Success"]);
?>