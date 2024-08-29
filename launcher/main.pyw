from flask import Flask, render_template, jsonify, request
import threading
import socket
import json
from code_py.func_app import check_heartbeat, start_executable, terminate_process, heartbeat
from code_py.config import json_add, content
import os

def find_free_port():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('localhost', 0))
    port = s.getsockname()[1]
    s.close()
    return port

app = Flask(__name__)

def rgb_to_hex(rgb):
    return '{:02x}{:02x}{:02x}'.format(*rgb)

@app.route('/')
def route_1():
    with open('project.json', 'r') as file:
        projects = json.load(file)
    projects_js = "let prg = " + json.dumps(projects) + ";"
    return render_template('index.html', json_add=json_add, projects=projects_js)


@app.route('/create', methods=['POST'])
def create_project():
    data = request.get_json()
    name = data if isinstance(data, str) else data.get('name')

    file_path = "project/" + name + ".consolas"

    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    
    with open(file_path, 'w') as file:
        file.write(content)

    if not name:
        return jsonify({'error': 'Name is required'}), 400

    project_entry = [name, f"project/{name}.consolas"]

    try:
        with open('project.json', 'r') as file:
            projects = json.load(file)

        projects.append(project_entry)

        with open('project.json', 'w') as file:
            json.dump(projects, file, indent=4)

        return jsonify({'status': 'success', 'project': project_entry}), 201

    except FileNotFoundError:
        return jsonify({'error': 'File not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/heartbeat', methods=['POST'])
def post_10():
    return heartbeat()

if __name__ == '__main__':
    port = find_free_port()

    html_content = f'<style>iframe{{position: fixed;height: 100%;width: 100%;top: 0%;left: 0%;}}</style><iframe src="http://127.0.0.1:{port}/" frameborder="0"></iframe>'

    file_content = f'''name = l
window_h = 800
window_w = 1000
html = "{html_content}"
    '''

    file_path = 'start.article'

    with open(file_path, 'w') as file:
        file.write(file_content)


    start_executable()
    threading.Thread(target=check_heartbeat, daemon=True).start()
    
    try:
        app.run(port=port)
    finally:
        terminate_process()