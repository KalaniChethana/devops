#!/bin/bash
set -e

echo "🚀 Deploying with Ansible..."
ansible-playbook -i ansible/inventory.ini ansible/deploy.yml
