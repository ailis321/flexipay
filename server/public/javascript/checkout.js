
const stripe = Stripe("pk_test_51O5DdBCkhYVN3YDQno05RFtCiRGflPMJoTmbVeqlwrOt011CgAXdhH6qG2jGY7bLVICyq0aFUVkkCJrRUcZMf3nJ00q8uRQQ5B"); // Replace with your actual publishable key


let elements;

initialize();
checkStatus();

document
  .querySelector("#payment-form")
  .addEventListener("submit", handleSubmit);

// Initialising the Stripe elements and mount the payment element
function initialize() {
  const appearance = {
    theme: 'stripe',
  };

   // Extracting information from the payment intent and customer
 const paymentIntentId = document.querySelector("#paymentIntentId").value;
 const customerId = document.querySelector("#customerId").value;
 const clientSecret = document.querySelector("#clientSecret").value;

  elements = stripe.elements({ appearance, clientSecret });
  
  const paymentElementOptions = {
    layout: "tabs",
  };

  const paymentElement = elements.create("payment", paymentElementOptions);
  paymentElement.mount("#payment-element");
}

async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
  
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:4242/checkout.html",
      },
    });
  
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      showMessage(error.message);
    } else {
      showMessage("An unexpected error occurred.");
    }
  
    setLoading(false);
  }
  
  // Fetches the payment intent status after payment submission
  async function checkStatus() {
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
  
    if (!clientSecret) {
      return;
    }
  
    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
  
    switch (paymentIntent.status) {
      case "succeeded":
        showMessage("Payment succeeded!");
        break;
      case "processing":
        showMessage("Your payment is processing.");
        break;
      case "requires_payment_method":
        showMessage("Your payment was not successful, please try again.");
        break;
      default:
        showMessage("Something went wrong.");
        break;
    }
  }
  
  // ------- UI helpers -------
  
  function showMessage(messageText) {
    const messageContainer = document.querySelector("#payment-message");
  
    messageContainer.classList.remove("hidden");
    messageContainer.textContent = messageText;
  
    setTimeout(function () {
      messageContainer.classList.add("hidden");
      messageContainer.textContent = "";
    }, 4000);
  }
  
  // Show a spinner on payment submission
  function setLoading(isLoading) {
    if (isLoading) {
      // Disable the button and show a spinner
      document.querySelector("#submit").disabled = true;
      document.querySelector("#spinner").classList.remove("hidden");
      document.querySelector("#button-text").classList.add("hidden");
    } else {
      document.querySelector("#submit").disabled = false;
      document.querySelector("#spinner").classList.add("hidden");
      document.querySelector("#button-text").classList.remove("hidden");
    }
  }