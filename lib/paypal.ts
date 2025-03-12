const base = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com';

export const paypal = {
  createOrder: async function createOrder(price: number) {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: price,
            },
          },
        ],
      }),
    });

    return handleResponse(response);
  },
  capturePayment: async function capturePayment(orderId: string) {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderId}/capture`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return handleResponse(response);
  },
};

// Generate an access token for the PayPal API
export async function generateAccessToken() {
  const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_APP_SECRET}`).toString(
    'base64'
  );

  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  // if (response.ok) {
  //   const jsonData = await response.json();
  //   return jsonData.access_token;
  // } else {
  //   const errorMessage = await response.text();
  //   throw new Error(errorMessage);
  // }

  const jsonData = await handleResponse(response);
  return jsonData.access_token;
}


async function handleResponse(response: any) {
  if (response.status === 200 || response.status === 201) {
    return response.json();
  }
  const errorMessage = await response.text();
  throw new Error(errorMessage);
}


// // Create a PayPal order
// test('creates a PayPal order', async () => {
//   const token = await generateAccessToken();
//   const price = 10.0; // Example price for testing

//   const orderResponse = await paypal.createOrder(price);
//   console.log(orderResponse);

//   // Ensure the order response contains expected fields
//   expect(orderResponse).toHaveProperty('id');
//   expect(orderResponse).toHaveProperty('status');
//   expect(orderResponse.status).toBe('CREATED'); // PayPal returns 'CREATED' for new orders
// });


// // Capture payment with a mock order
// test('simulates capturing a PayPal order', async () => {
//   const orderId = '100'; // Mock order ID

//   // Mock the capturePayment function to return a successful response
//   const mockCapturePayment = jest
//     .spyOn(paypal, 'capturePayment')
//     .mockResolvedValue({
//       status: 'COMPLETED',
//     });

//   // Call the capturePayment function with the mock order ID
//   const captureResponse = await paypal.capturePayment(orderId);
//   // Ensure the capture response contains expected fields
//   expect(captureResponse).toHaveProperty('status', 'COMPLETED');

//   // Clean up mock
//   mockCapturePayment.mockRestore();
// });