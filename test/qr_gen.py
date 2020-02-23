import qrcode


def gen_qr(text, file_name, fill_color="black", back_color="white"):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4
    )
    qr.add_data(text)
    qr.make()

    img = qr.make_image(fill_color=fill_color, back_color=back_color)
    img.save(file_name + '.png')


gen_qr("Cordoba;18:30", "cordoba_1830", fill_color="blue", back_color="orange")
gen_qr("Malaga;19:30", "malaga_1930", fill_color="yellow", back_color="green")
gen_qr("Granada Bus Station;16:15", "granada_1615",
       fill_color="blue", back_color="yellow")
