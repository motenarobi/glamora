<?php
header('Content-Type: application/json');

// Get the checkout request ID from the query string
$checkoutRequestId = $_GET['checkoutRequestId'] ?? '';

if (empty($checkoutRequestId)) {
    echo json_encode(['status' => 'error', 'message' => 'No checkout request ID provided']);
    exit;
}

// Read the callback log file
$logFile = 'mpesa_callback.log';
$logContent = file_get_contents($logFile);

// Search for the checkout request ID in the log
if (strpos($logContent, $checkoutRequestId) !== false) {
    // Check if the payment was successful
    if (strpos($logContent, "Payment successful for CheckoutRequestID: $checkoutRequestId") !== false) {
        // Extract transaction ID from the log
        preg_match("/Receipt: ([A-Z0-9]+)/", $logContent, $matches);
        $transactionId = $matches[1] ?? '';
        
        echo json_encode([
            'status' => 'success',
            'transactionId' => $transactionId
        ]);
    } else {
        echo json_encode(['status' => 'failed']);
    }
} else {
    // Payment status not found yet
    echo json_encode(['status' => 'pending']);
}
?> 