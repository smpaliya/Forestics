from django.contrib import admin
from .models import Post, Articles,BirdDetails,UserProfile

class PostAdmin(admin.ModelAdmin):
    list_display = ('username', 'photo', 'comment', 'likes')

class ArticlesAdmin(admin.ModelAdmin):
    list_display = ('id','username', 'articleImage', 'title', 'article','date')

class BirdDetailAdmin(admin.ModelAdmin):
    list_display=('id', 'name', 'detail','habitat','diet','conservationstatus')

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'profile_picture') 

admin.site.register(Post, PostAdmin)
admin.site.register(Articles, ArticlesAdmin)
admin.site.register(BirdDetails,BirdDetailAdmin)
admin.site.register(UserProfile,UserProfileAdmin)