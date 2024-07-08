from flask import Flask, request
from functions import *
from flask_cors import CORS

app = Flask(__name__)
CORS(app)



@app.route('/api/productos/nombres', methods=['GET'])
def get_nombres_productos():
    cnx = get_db_connection()
    cursor = cnx.cursor()
    cursor.execute("SELECT nom_producto FROM productos")
    result = cursor.fetchall()
    cursor.close()

    lista_productos = [row[0] for row in result]
    return lista_productos

@app.route('/api/productos', methods=['GET'])
def get_productos():
    cnx = get_db_connection()
    cursor = cnx.cursor(dictionary=True)
    cursor.execute("SELECT * FROM productos")
    result = cursor.fetchall()
    cursor.close()

    return result

@app.route('/api/movimientos', methods=['GET'])
def get_movimientos():
    cnx = get_db_connection()
    cursor = cnx.cursor(dictionary=True)
    cursor.execute("""SELECT id_mov as id2, id_producto, nom_producto, tipo_movimiento, fecha, cantidad, valor_movimiento 
                   FROM movimientos 
                   LEFT JOIN productos 
                   ON movimientos.id_producto = productos.id 
                   ORDER BY id2 DESC
                   LIMIT 10""")
    result = cursor.fetchall()
    cursor.close()

    return result


@app.route('/api/productos/compras', methods=['POST'])
def comprar_producto(): #producto, cantidad, precio
    cnx = get_db_connection()
    lista_productos = get_nombres_productos()
    tipo_movimiento = "Compra"

    peticion_comprar = request.get_json()
    producto = peticion_comprar['producto']
    if not producto:
        return {"message": "Falta el producto"}, 400
    
    cantidad = peticion_comprar['cantidad']
    if not cantidad:
        return {"message": "Falta la cantidad"}, 400
    
    precio = peticion_comprar['precio']
    if not precio:
        return {"message": "Falta el precio"}, 400

    if producto in lista_productos:
        cursor = cnx.cursor()
        query = """UPDATE productos SET cantidad_disp = cantidad_disp + %s, precio = %s WHERE nom_producto = %s"""
        values = (cantidad, precio, producto)
        cursor.execute(query, values)
        cnx.commit()

        nuevo_movimiento(producto, tipo_movimiento, cantidad, precio)

        cursor.close()
        return {"message":"Compra Completada"}, 201
    else:
        return {"message": "Producto no encontrado"}, 404
    
@app.route('/api/productos/nuevo', methods=['POST'])
def nuevo_producto():
    cnx = get_db_connection()
    lista_productos = get_nombres_productos()

    producto = request.get_json()['producto']

    if producto in lista_productos:
        return {"message": "Producto ya existe"}, 400
    
    if not producto:
        return {"message": "Falta el producto"}, 400
    else:
        cursor = cnx.cursor()
        query = """INSERT INTO productos (nom_producto, cantidad_disp, precio) VALUES (%s, %s, %s)"""
        values = (producto, 0, 0)
        cursor.execute(query, values)
        cnx.commit()
        
        cursor.close()
        return {"message": "Producto creado"}, 201
    
@app.route('/api/productos/inventario', methods=['GET'])
def get_inventario():
    cnx = get_db_connection()
    lista_productos = get_nombres_productos()

    producto = request.get_json()['producto']

    if not producto:
        return {"message": "Ingrese el producto"}, 400
    
    if producto not in lista_productos:
        return {"message": "Producto no encontrado"}, 404
    else:
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("SELECT nom_producto, cantidad_disp FROM productos WHERE nom_producto = %s", (producto,))
        result = cursor.fetchall()
        cursor.close()

        inventario = {row[0]: row[1] for row in result}
        for producto, cantidad in inventario.items():
            return f"{producto}: {cantidad} unidades", 200
    
@app.route('/api/productos/modificar_precio', methods=['POST'])
def modificar_precio():
    cnx = get_db_connection()

    producto = request.get_json()['producto']
    precio = request.get_json()['precio']

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
        return {"message": "Modificación completada"}, 200
    else:
        return f"No se encontró el producto {producto}", 404
    
@app.route('/api/productos/vender', methods=['POST'])
def vender_producto():
    cnx = get_db_connection()
    tipo_movimiento = "Venta"
    cursor = cnx.cursor()

    producto = request.get_json()['producto']
    if not producto:
        return {"message": "Falta el producto"}, 400
    
    cantidad = request.get_json()['cantidad']
    if not cantidad:
        return {"message": "Falta la cantidad"}, 400
    
    precio = request.get_json()['precio']
    if not precio:
        return {"message": "Falta el precio"}, 400

    if producto not in get_nombres_productos():
        return {"message": "Producto no encontrado"}, 404
    
    else:
        query = """SELECT cantidad_disp FROM productos WHERE nom_producto = %s"""
        cursor.execute(query, (producto,))
        result = cursor.fetchall()

        if result[0][0] < int(cantidad):
            # TODO - Cómo se hace el mensaje acá?
            return {"message": "No hay suficientes unidades para completar la venta."}, 400
        
        else:
            query_update = """UPDATE productos SET cantidad_disp = cantidad_disp - %s WHERE nom_producto = %s"""
            values = (cantidad, producto)
            cursor.execute(query_update, values)
            cnx.commit()

            nuevo_movimiento(producto, tipo_movimiento, cantidad, precio)
            
    cursor.close()
    return {"message": "Venta completada"}, 201

@app.route('/api/indicadores/mercancia', methods=['GET'])
def mercancia_vendida():
    cnx = get_db_connection()
    cursor = cnx.cursor(dictionary=True)

    args = request.args

    fecha_inicio = args.get('fecha_inicio')
    fecha_fin = args.get('fecha_fin')

    query = """SELECT id, nom_producto, SUM(cantidad) as total_vendido 
                FROM movimientos
                LEFT JOIN productos
                ON movimientos.id_producto = productos.id
                WHERE tipo_movimiento = 'Venta'
                AND fecha BETWEEN %s AND %s
                GROUP BY id"""
    values = (fecha_inicio, fecha_fin)
    cursor.execute(query, values)
    result = cursor.fetchall()

    cursor.close()
    return result

@app.route('/api/indicadores/inversion', methods=['GET'])
def inversion_total():
    cnx = get_db_connection()
    cursor = cnx.cursor(dictionary=True)

    args = request.args

    fecha_inicio = args.get('fecha_inicio')
    fecha_fin = args.get('fecha_fin')

    query = """SELECT id, nom_producto,  SUM(valor_movimiento) as total_invertido
                FROM movimientos
                LEFT JOIN productos
                ON movimientos.id_producto = productos.id
                WHERE tipo_movimiento = 'Compra'
                AND fecha BETWEEN %s AND %s
                GROUP BY id"""
    values = (fecha_inicio, fecha_fin)
    cursor.execute(query, values)
    result = cursor.fetchall()

    cursor.close()
    return result

if __name__ == '__main__':
    app.run(debug=True, port = 8080)