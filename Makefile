# Форматирование и линтинг кода
lint-backend:
	cd backend && uv run ruff check --fix --show-fixes

lint-frontend:
	@echo "lint forntend"

lint: lint-backend lint-frontend

format-backend:
	cd backend && uv run ruff format .

format-frontend:
	@echo "format frontend"

format: format-frontend format-backend

lf-backend: format-backend lint-backend

lf-frontend: format-frontend lint-frontend

laf: lf-backend lf-frontend
