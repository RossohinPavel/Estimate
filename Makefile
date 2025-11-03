# Форматирование и линтинг кода
lint-backend:
	cd backend && uv run ruff check --fix --show-fixes

lint-frontend:
	cd frontend && pnpm types && pnpm lint

format-backend:
	cd backend && uv run ruff format .

format-frontend:
	cd frontend && pnpm format

laf: lint-backend format-backend lint-frontend format-frontend
	@echo [-- All checks passed, code formatted --]
