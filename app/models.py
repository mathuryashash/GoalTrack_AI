from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Task(db.Model):
    __tablename__ = "tasks"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    priority = db.Column(db.Integer, default=3) # 1-5
    progress = db.Column(db.Integer, default=0) # 0-100
    is_completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "priority": self.priority,
            "progress": self.progress,
            "is_completed": self.is_completed,
            "created_at": self.created_at.isoformat()
        }
