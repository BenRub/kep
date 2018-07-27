import mysql.connector
from mysql.connector import Error

HOST = "db"
PORT = 3306
USER = "root"
PASS = "mypassword"
DBNAME = "mydb"

class DBLayer(object):

	def use_db(self, callback):
		dbConnection = None
		cursor = None
		try:
			dbConnection = mysql.connector.connect(host=HOST, port=PORT, user=USER, passwd=PASS, database=DBNAME)
			cursor = dbConnection.cursor(buffered=True)
			result = callback(cursor)
			dbConnection.commit()
			return result
		except Error as err:
			return "Something went wrong: {}".format(err)
		finally:
			if cursor is not None:
				cursor.close()
			if dbConnection is not None:
				dbConnection.close()

	def get_data(self):
		return self.use_db(lambda cursor: self.actual_get_data(cursor))

	def actual_get_data(self, cursor):
		dataList = []
		cursor.execute("SELECT * FROM currencies")
		row = cursor.fetchone()
		while row is not None:
			dataList.append({'currency': row[1], 'exchange': row[2], 'volume': row[3], 'value': row[4]})
			row = cursor.fetchone()
		return dataList

	def insert_data(self, dataList):
		if len(dataList) == 0:
			return;
		insertQuery = "insert into currencies (`currency`, `exchange`, `volume`, `value`) values "
		firstData = True
		for data in dataList:
			if firstData:
				firstData = False
			else:
				insertQuery += ", "
			insertQuery += " ('{0}', '{1}', {2}, {3}) ".format(data['currency'], data['exchange'], data['volume'], data['value'])
		insertQuery += " ON DUPLICATE KEY UPDATE volume = volume + VALUES(volume), value = value + VALUES(value)"
		self.use_db(lambda cursor: cursor.execute(insertQuery))