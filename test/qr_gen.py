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


gen_qr("Malaga;10:30", "qr_late", fill_color="blue", back_color="orange")
gen_qr("Granada Bus Station;11:15", "qr_hurry_up",
       fill_color="yellow", back_color="green")
gen_qr("Cordoba;12:30", "qr_on_time",
       fill_color="blue", back_color="yellow")
