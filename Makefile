# Форматирование и линтинг кода
lint-backend:
	cd backend && uv run ruff check --fix --show-fixes

lint-frontend:
	cd frontend && pnpm types && pnpm lint

lint: lint-backend lint-frontend

format-backend:
	cd backend && uv run ruff format .

format-frontend:
	cd frontend && pnpm format

format: format-frontend format-backend

laf-backend: format-backend lint-backend

laf-frontend: format-frontend lint-frontend

laf: laf-backend laf-frontend
	@echo [-- All checks passed, code formatted --]
