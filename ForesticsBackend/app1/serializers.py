from rest_framework import serializers
from .models import Post, Articles,BirdDetails,UserProfile
from django.contrib.auth.models import User
from urllib.parse import urljoin
from django.conf import settings
from rest_framework.exceptions import ValidationError
class PostSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(required=False)
    username = serializers.CharField(source='username.username') 
    class Meta:
        model = Post
        fields = ('id', 'username', 'photo', 'comment', 'likes')
        extra_kwargs = {
            'username': {'required': True},
            'photo': {'required': True},
            'date': {'required': False}, 
        }
    def get_photo(self, obj):
        request = self.context.get('request')
        if obj.photo and request:
            # This should now generate the correct full path with no duplication
            return request.build_absolute_uri(obj.photo.url)
        return None
    def create(self, validated_data):
        username_data = validated_data.pop('username')
        username = username_data if isinstance(username_data, str) else username_data.get('username')

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise serializers.ValidationError(f"User with username {username} does not exist.")

        post = Post.objects.create(username=user, **validated_data)
        return post
        
  

class ArticlesSerializer(serializers.ModelSerializer):
   
    username = serializers.CharField(source='username.username', read_only=True)  # Change this to use 'username'

    class Meta:
        model = Articles
        fields = ['id','title', 'article', 'articleImage', 'date','username']  

    def create(self, validated_data):
        user = self.context['request'].user  # Get the authenticated user
        # Remove username from validated_data if it exists
        validated_data.pop('username', None)
        
        # Create the article with the authenticated user
        article = Articles.objects.create(username=user, **validated_data)
        return article
    
    
class UserProfileSerializer(serializers.ModelSerializer):
    profile_picture_url = serializers.SerializerMethodField()
    class Meta:
        model = UserProfile
        fields = ['profile_picture','profile_picture_url']
    def get_profile_picture_url(self, obj):
        # Handle empty profile picture
        if obj.profile_picture:
            return self.context['request'].build_absolute_uri(obj.profile_picture.url)
        return None

class UserSerializer(serializers.ModelSerializer):
    post_count = serializers.SerializerMethodField()
    profile = UserProfileSerializer(source='userprofile')
    class Meta:
        model = User
        fields = ('id', 'username', 'email','password','post_count','profile') 
        extra_kwargs = {'password': {'write_only': True}}
    def get_post_count(self, obj):
        return obj.UserPosts.count() 

class BirdSerializer(serializers.ModelSerializer):
    class Meta:
        model=BirdDetails
        fields = ('id', 'name', 'detail','habitat','diet','conservationstatus')

