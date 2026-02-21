from flask import Blueprint, request, jsonify
from app.models import db, Task

tasks_bp = Blueprint('tasks', __name__, url_prefix='/tasks')

@tasks_bp.route('/', methods=['GET'])
def get_tasks():
    tasks = Task.query.order_by(Task.created_at.desc()).all()
    return jsonify([t.to_dict() for t in tasks])

@tasks_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"}), 200

@tasks_bp.route('/', methods=['POST'])
def create_task():
    data = request.json
    task = Task(
        title=data.get('title'),
        priority=data.get('priority', 3)
    )
    db.session.add(task)
    db.session.commit()
    return jsonify(task.to_dict()), 201

@tasks_bp.route('/<int:id>', methods=['PUT'])
def update_task(id):
    task = Task.query.get_or_404(id)
    data = request.json
    if 'progress' in data:
        task.progress = min(100, max(0, data['progress']))
        if task.progress == 100:
            task.is_completed = True
        else:
            task.is_completed = False
            
    if 'is_completed' in data:
        task.is_completed = data['is_completed']
        if task.is_completed: 
            task.progress = 100
        else:
            if task.progress == 100: task.progress = 0
            
    db.session.commit()
    return jsonify(task.to_dict())

@tasks_bp.route('/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return '', 204
