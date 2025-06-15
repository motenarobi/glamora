<?php
header('Content-Type: application/json');

$checkoutRequestID = $_GET['checkoutRequestID'];
$logFile = 'mpesa_payments.log';

// Search log file for this transaction
if (file_exists($logFile)) {
    $payments = array_reverse(file($logFile)); // Check most recent first
    foreach($payments as $payment) {
        $data = json_decode($payment, true);
        if (isset($data['Body']['stkCallback']['CheckoutRequestID']) ){
            if($data['Body']['stkCallback']['CheckoutRequestID'] == $checkoutRequestID) {
                $result = $data['Body']['stkCallback'];
                
                if($result['ResultCode'] == 0) {
                    // Payment successful
                    $receipt = $result['CallbackMetadata']['Item'][1]['Value'];
                    $amount = $result['CallbackMetadata']['Item'][0]['Value'];
                    
                    echo json_encode([
                        'status' => 'success',
                        'receipt' => $receipt,
                        'amount' => $amount
                    ]);
                    exit;
                } else {
                    // Payment failed
                    echo json_encode([
                        'status' => 'failed',
                        'message' => $result['ResultDesc']
                    ]);
                    exit;
                }
            }
        }
    }
}

// Payment still pending
echo json_encode(['status' => 'pending']);
?>