from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector
import os
from dotenv import load_dotenv

# To load env variables
load_dotenv()

# create fastapi
app=FastAPI()

# allow frontend to call backend
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# what React should sends when adding favs
class FavoriteCountry(BaseModel):
    common_name: str
    flag_png: str | None = None
    region: str | None = None
    capital: str | None = None

def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
    )

# GET endpoint: GET http://localhost:8000/api/favorites
@app.get("/api/favorites")
def get_favorites():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("SELECT * FROM favorites")
        results = cursor.fetchall()
        return results
    
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=str(err))
    
    finally:
        cursor.close()
        conn.close()

# POST for likes: POST http://localhost:8000/api/favorites insert Ignore - ignores duplicates
@app.post("/api/favorites")
def add_favorites(country: FavoriteCountry):
    conn = get_db_connection()
    cursor = conn.cursor()

    try: 
        sql = """
        INSERT IGNORE INTO favorites (common_name, flag_png, region, capital)
        VALUES (%s, %s, %s, %s)
        """

        values = (
            country.common_name,
            country.flag_png,
            country.region,
            country.capital,
        )

        cursor.execute(sql, values)
        conn.commit()

        return {"message": "Favorite added"}
    
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=str(err))
    
    finally:
        cursor.close()
        conn.close()

# Delete favorite country: DELETE http://localhost:8000/api/favorites/Japan
@app.delete("/api/favorites/{common_name}")
def delete_favorite(common_name: str):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            "DELETE FROM favorites WHERE common_name = %s",
            (common_name,),
        )
        conn.commit()

        return {"message": "Favorite removed"}
    
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=str(err))
    
    finally:
        cursor.close()
        conn.close()


