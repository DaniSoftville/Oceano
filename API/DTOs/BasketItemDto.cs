namespace API.DTOs;

public class BasketItemDto
{
    public int ProductId { get; set; }
    public string Name { get; set; }
    public long Price { get; set; }
    public string PictureUrl { get; set; }
    public string Description { get; set; }
    public string Size { get; set; }
    public string Type { get; set; }
    public string Genre { get; set; }
    public int Quantity { get; set; }
}