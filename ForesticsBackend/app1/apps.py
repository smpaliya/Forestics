from django.apps import AppConfig
from django.apps import AppConfig

class YourAppConfig(AppConfig):
    name = 'app1'

    def ready(self):
        import app1.signals  # Ensure signals are loaded

class App1Config(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app1'
