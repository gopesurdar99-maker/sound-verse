from sqlalchemy import create_engine, text
engine = create_engine("postgresql+psycopg://postgres:postgres@localhost:5432/soundverse")
with engine.connect() as conn:
    conn.execute(text("UPDATE products SET description='Premium wireless noise-cancelling headphones crafted for pure music immersion, featuring an iconic acoustic architecture.', image='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80' WHERE slug='bose-quietcomfort-45';"))
    conn.commit()
