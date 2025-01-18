"""
URL configuration for ForesticsBackend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers 
from django.urls import path
from app1 import views
# Import views from your app
# Set up routers for viewsets (DRF API endpoints)
router = routers.DefaultRouter()
router.register(r'posts', views.PostView, 'post')
router.register(r'articles', views.ArticlesView, 'article')
router.register(r'users',views.UserView,'user')
router.register(r'bird',views.BirdView,'bird')
urlpatterns = [
    path('admin/', admin.site.urls),  # Django admin panel
    path('register/', views.register_user, name='register'),  # User registration endpoint
    path('api/', include(router.urls)),  # API routes (posts, articles, etc.)
    #user info
    path('api/user-info/', views.get_user_info),
    #To get posts of a user
    path('api/user-posts/<str:username>/', views.get_user_posts, name='get_user_posts'),
    path('api/upload-image/', views.upload_image, name='upload-image'),
    path('api-token-auth/', views.api_token_auth),
    path('api/users', views.register_user, name='register_user'),
    path('', views.home, name='home'), 
]
# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)