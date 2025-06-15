<?php
// Log the callback for debugging
$logFile = 'mpesa_callback.log';
file_put_contents($logFile, date('Y-m-d H:i:s') . " - Callback received\n", FILE_APPEND);

// Get the callback data
$callbackData = json_decode(file_get_contents('php://input'), true);
file_put_contents($logFile, print_r($callbackData, true) . "\n", FILE_APPEND);

// Check if the payment was successful
if (isset($callbackData['Body']['stkCallback']['ResultCode'])) {
    $resultCode = $callbackData['Body']['stkCallback']['ResultCode'];
    $checkoutRequestId = $callbackData['Body']['stkCallback']['CheckoutRequestID'];
    
    if ($resultCode == 0) {
        // Payment successful
        $merchantRequestId = $callbackData['Body']['stkCallback']['MerchantRequestID'];
        $checkoutRequestId = $callbackData['Body']['stkCallback']['CheckoutRequestID'];
        
        // Extract payment details
        $callbackMetadata = $callbackData['Body']['stkCallback']['CallbackMetadata']['Item'];
        $amount = 0;
        $mpesaReceiptNumber = '';
        $transactionDate = '';
        $phoneNumber = '';
        
        foreach ($callbackMetadata as $item) {
            switch ($item['Name']) {
                case 'Amount':
                    $amount = $item['Value'];
                    break;
                case 'MpesaReceiptNumber':
                    $mpesaReceiptNumber = $item['Value'];
                    break;
                case 'TransactionDate':
                    $transactionDate = $item['Value'];
                    break;
                case 'PhoneNumber':
                    $phoneNumber = $item['Value'];
                    break;
            }
        }
        
        // Here you would typically:
        // 1. Update your database to mark the order as paid
        // 2. Send confirmation email to customer
        // 3. Update inventory
        
        // For now, we'll just log the success
        file_put_contents($logFile, "Payment successful for CheckoutRequestID: $checkoutRequestId\n", FILE_APPEND);
        file_put_contents($logFile, "Amount: $amount, Receipt: $mpesaReceiptNumber\n", FILE_APPEND);
        
        // Return success response
        echo json_encode(['status' => 'success']);
    } else {
        // Payment failed
        file_put_contents($logFile, "Payment failed for CheckoutRequestID: $checkoutRequestId\n", FILE_APPEND);
        echo json_encode(['status' => 'failed']);
    }
} else {
    // Invalid callback data
    file_put_contents($logFile, "Invalid callback data received\n", FILE_APPEND);
    echo json_encode(['status' => 'error', 'message' => 'Invalid callback data']);
}
?> 