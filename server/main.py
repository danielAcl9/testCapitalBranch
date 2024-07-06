from flask import Flask, request
from functions import *
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

cnx = get_db_connection()

@app.route('/api/productos/nombres', methods=['GET'])
def get_nombres_productos():
    cursor = cnx.cursor()
    cursor.execute("SELECT nom_producto FROM productos")
    result = cursor.fetchall()
    cursor.close()

    lista_productos = [row[0] for row in result]
    return lista_productos

@app.route('/api/movimientos', methods=['GET'])
def get_movimientos():
    cursor = cnx.cursor()
    cursor.execute("""SELECT id_producto, nom_producto, tipo_movimiento, fecha, cantidad, valor_movimiento FROM movimientos LEFT JOIN productos ON movimientos.id_producto = productos.id""")
    result = cursor.fetchall()
    cursor.close()
    
    return result

@app.route('/api/productos', methods=['GET'])
def get_productos():
    cursor = cnx.cursor(dictionary=True)
    cursor.execute("SELECT * FROM productos")
    result = cursor.fetchall()
    cursor.close()

    return result

@app.route('/api/productos/compras', methods=['POST'])
def comprar_producto(): #producto, cantidad, precio
    lista_productos = get_nombres_productos()
    tipo_movimiento = "Compra"

    # TODO Arreglar 
    peticion_comprar = request.get_json()
    producto = peticion_comprar['producto']
    if not producto:
        return "Falta el producto", 400
    
    cantidad = peticion_comprar['cantidad']
    if not cantidad:
        return "Falta la cantidad", 400
    
    precio = peticion_comprar['precio']
    if not precio:
        return "Falta el precio", 400
    # TODO

    if producto in lista_productos:
        cursor = cnx.cursor()
        query = """UPDATE productos SET cantidad_disp = cantidad_disp + %s, precio = %s WHERE nom_producto = %s"""
        values = (cantidad, precio, producto)
        cursor.execute(query, values)
        cnx.commit()

        nuevo_movimiento(producto, tipo_movimiento, cantidad, precio)

        
        return {"message":"Compra Completada"}, 201
    else:
        return "Producto no encontrado", 404
    
@app.route('/api/productos/nuevo', methods=['POST'])
def nuevo_producto():

    lista_productos = get_nombres_productos()

    # TODO Arreglar 
    producto = request.get_json()['producto']
    # TODO 

    if producto in lista_productos:
        return "Producto ya existe", 400
    
    if not producto:
        return "Falta el producto", 400
    else:
        cursor = cnx.cursor()
        query = """INSERT INTO productos (nom_producto, cantidad_disp, precio) VALUES (%s, %s, %s)"""
        values = (producto, 0, 0)
        cursor.execute(query, values)
        cnx.commit()
        
        cursor.close()
        return "Producto creado", 201
    
@app.route('/api/productos/inventario', methods=['GET'])
def get_inventario():
    lista_productos = get_nombres_productos()

    # TODO Arreglar 
    producto = request.get_json()['producto']
    # TODO

    if not producto:
        return "Ingrese el producto", 400
    
    if producto not in lista_productos:
        return "Producto no encontrado", 404
    else:
        cursor = cnx.cursor()
        cursor.execute("SELECT nom_producto, cantidad_disp FROM productos WHERE nom_producto = %s", (producto,))
        result = cursor.fetchall()
        cursor.close()

        inventario = {row[0]: row[1] for row in result}
        for producto, cantidad in inventario.items():
            return f"{producto}: {cantidad} unidades", 200
    
@app.route('/api/productos/modificar_precio', methods=['POST'])
def modificar_precio():

    # TODO Arreglar 
    producto = request.get_json()['producto']
    precio = request.get_json()['precio']
    # TODO

    cursor = cnx.cursor()
    query = """UPDATE productos SET precio = %s WHERE nom_producto = %s"""
    values = (precio, producto)
    cursor.execute(query, values)
    cnx.commit()

    cursor = cnx.cursor()
    cursor.execute("SELECT precio FROM productos WHERE nom_producto = %s", (producto,))
    result = cursor.fetchone()
    cursor.close()

    if result:
        return f"El precio del producto {producto} ha sido modificado a {result[0]}", 200
    else:
        return f"No se encontró el producto {producto}", 404
    
@app.route('/api/productos/vender', methods=['POST'])
def vender_producto():
    tipo_movimiento = "Venta"
    cursor = cnx.cursor()

    # TODO Arreglar
    producto = request.get_json()['producto']
    if not producto:
        return "Falta el producto", 400
    
    cantidad = request.get_json()['cantidad']
    if not cantidad:
        return "Falta la cantidad", 400
    
    precio = request.get_json()['precio']
    if not precio:
        return "Falta el precio", 400

    # TODO

    if producto not in get_nombres_productos():
        return "Producto no encontrado", 404
    else:
        query = """SELECT cantidad_disp FROM productos WHERE nom_producto = %s"""
        cursor.execute(query, (producto,))
        result = cursor.fetchone()

        if result[0] < cantidad:
            return f"No hay suficiente inventario para completar la venta, unidades disponibles: {result[0]}", 400
        
        else:
            query_update = """UPDATE productos SET cantidad_disp = cantidad_disp - %s WHERE nom_producto = %s"""
            values = (cantidad, producto)
            cursor.execute(query_update, values)
            cnx.commit()

            nuevo_movimiento(producto, tipo_movimiento, cantidad, precio)

    cursor.close()
    return f"Venta de {cantidad} unidades de {producto} completada", 201




if __name__ == '__main__':
    app.run(debug=True, port = 8080)