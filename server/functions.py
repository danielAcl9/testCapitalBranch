import mysql.connector
from datetime import date

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="nAddLeo56.",
        database="test_db_capitalbranch")

cnx = get_db_connection()

def get_dato_producto(dato, producto):
    cursor = cnx.cursor()
    cursor.execute(f"""SELECT {dato} FROM productos WHERE nom_producto = "{producto}" """)
    result = cursor.fetchall()
    cursor.close()
    return result[0][0]

def nuevo_movimiento(producto, tipo_movimiento, cantidad, precio):
    cursor = cnx.cursor()

    fecha = date.today()
    id_prod = get_dato_producto("id", producto)

    query = """INSERT INTO movimientos (id_producto, tipo_movimiento, fecha, cantidad, valor_movimiento) VALUES (%s, %s, %s, %s, %s)"""
    values = (id_prod, tipo_movimiento, fecha, cantidad, precio)
    cursor.execute(query, values)

    cnx.commit()
    cursor.close()