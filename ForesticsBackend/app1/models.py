from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.conf import settings

from datetime import datetime
from datetime import date
class Post(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE, related_name='UserPosts')
    photo = models.ImageField(upload_to='posts/')
    comment = models.TextField()
    likes = models.IntegerField(default=0)  # Set default value

    def __str__(self):
        return f'{self.username.username}\'s post'
    
    def get_photo_url(self):
        if self.photo:
            return self.photo.url  # The photo.url already contains MEDIA_URL
        return None
    

class Articles(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE, related_name='Articles')
    articleImage = models.ImageField(upload_to='articles/')
    article = models.TextField(max_length=5000)
    title = models.CharField(max_length=255)  # Added max_length
    date=models.DateField(default=date.today)
    def __str__(self):
        return self.title

class BirdDetails(models.Model):
    name=models.CharField(max_length=100)
    detail=models.TextField(max_length=5000)
    habitat=models.TextField()
    diet=models.TextField()
    conservationstatus=models.CharField(max_length=50)
    def __str__(self):
        return f'{self.name}\'s details'
    
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

    def __str__(self):
        return self.user.username
    
