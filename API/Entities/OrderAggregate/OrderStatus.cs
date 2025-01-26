namespace API.Entities.OrderAggregate;

public enum OrderStatus
{
    Pending,
    PaymentReceived,
    PaymentFailed,
    Shipped,
    Delivered,
    Canceled,
    PaymentCanceled  // Add this line
}