from app import create_app, db
import os

app = create_app()

if __name__ == '__main__':
    with app.app_context():
        # Create tables if they don't exist
        db.create_all()
    
    # Get port from environment or default to 5000
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
