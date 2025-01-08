from PIL import Image, ImageDraw, ImageFont
import os

def create_frame(user_name, output_file="birthday_frame.png"):
    """
    Creates a birthday frame with the user's name.
    
    Args:
        user_name (str): The name to include in the frame.
        output_file (str): The path to save the output image.
    """
    # Ensure output_file has a valid extension
    if not output_file.endswith(".png"):
        output_file = f"{os.path.splitext(output_file)[0]}.png"
    
    # Define frame size and colors
    width, height = 800, 600
    background_color = (255, 255, 200)  # Light yellow
    text_color = (0, 102, 204)          # Blue
    
    # Create a blank image with background color
    image = Image.new("RGB", (width, height), background_color)
    draw = ImageDraw.Draw(image)
    
    # Add a title
    try:
        title_font = ImageFont.truetype("arial.ttf", 40)  # Update with your font path if needed
    except IOError:
        print("Error: Font file 'arial.ttf' not found.")
        return None
    title_text = "Happy Birthday!"
    title_width, title_height = draw.textsize(title_text, font=title_font)
    draw.text(((width - title_width) / 2, 100), title_text, fill=text_color, font=title_font)
    
    # Add the user's name
    name_font = ImageFont.truetype("arial.ttf", 30)  # Update with your font path if needed
    name_text = f"Dear {user_name},"
    name_width, name_height = draw.textsize(name_text, font=name_font)
    draw.text(((width - name_width) / 2, 200), name_text, fill=text_color, font=name_font)
    
    # Add a footer message
    footer_text = "Wishing you all the best!"
    footer_font = ImageFont.truetype("arial.ttf", 20)
    footer_width, footer_height = draw.textsize(footer_text, font=footer_font)
    draw.text(((width - footer_width) / 2, 400), footer_text, fill=text_color, font=footer_font)
    
    # Save the image
    image.save(output_file)
    print(f"Birthday frame created: {output_file}")
    return output_file
