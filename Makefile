# Форматирование и линтинг кода
lint-backend:
	cd backend && uv run ruff check --fix --show-fixes

lint-frontend:
	cd frontend && pnpm types && pnpm lint && pnpm stylecheck

format-backend:
	cd backend && uv run ruff format .

format-frontend:
	cd frontend && pnpm format && pnpm stylelint

laf: lint-backend format-backend format-frontend lint-frontend 
	@echo [-- All checks passed, code formatted --]
