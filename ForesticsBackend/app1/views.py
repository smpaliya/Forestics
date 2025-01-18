from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import PostSerializer, ArticlesSerializer, UserSerializer,BirdSerializer
from .models import Post, Articles,BirdDetails,UserProfile
from rest_framework.decorators import action
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate 
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.views import obtain_auth_token
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser
import tensorflow as tf
from django.conf import settings
import io
from tensorflow.keras.preprocessing import image
import keras
import os
import numpy as np
from tensorflow.keras.models import load_model
@csrf_exempt
def api_token_auth(request):
    return obtain_auth_token(request)

def home(request):
    return render(request, 'index.html') 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    serializer = UserSerializer(user,context={'request': request})
    return Response(serializer.data)

def get_user_posts(request, username):
    print(f"Received request for username: {username}") 
    try:
        
        posts = Post.objects.filter(username__username__iexact=username)
        print(f"Posts queryset: {posts}")  
        print(f"Number of posts found: {posts.count()}")  

        if not posts.exists():
            print(f"No posts found for user: {username}")  
            return JsonResponse({'error': 'No posts found for this user'}, status=404)

        #  response data
        posts_data = [
            {
                'id': post.id,
                'username': post.username.username,
                'photo': request.build_absolute_uri(post.photo.url),
                'comment': post.comment,
                'likes': post.likes,
            }
            for post in posts
        ]
        print(f"Posts data: {posts_data}")  # Debugging print
        return JsonResponse(posts_data, safe=False)

    except Post.DoesNotExist:
        print(f"Exception: Post does not exist for user {username}")  # Debugging print
        return JsonResponse({'error': 'No posts found for this user'}, status=404)


@api_view(['POST'])
def upload_image(request):
    enteredimage = request.FILES['photo']
    img_byte_stream = io.BytesIO(enteredimage.read())
    img = image.load_img(img_byte_stream, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  
    model_path =os.path.join(settings.MODEL_DIR, 'bestaccuracy_transfer_finetune_model.keras')
    model = load_model(model_path)
    # Preprocess the image and make predictions
    prediction = model.predict(img_array)
    top_2_indices = np.argsort(prediction[0])[-2:][::-1]  # Sort and reverse to get the top 2
    # Print the top 2 predicted classes and their probabilities
    birds=[]
    for idx in top_2_indices:
        birds.append(bird_names[idx])
    # Fetch bird details from the BirdDetails model
    bird_details = BirdDetails.objects.filter(name__in=birds)
    bird_details_serialized =BirdSerializer(bird_details, many=True).data

    
    return Response({
        'bird_names': birds,
        'bird_details': bird_details_serialized
    })
   

@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    profile_picture = request.FILES.get('profile_picture')  # Get the profile picture from request

    if not username or not email or not password:
        return Response({'error': 'Please provide all required fields'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already taken'}, status=status.HTTP_400_BAD_REQUEST)
    try:
          user = User.objects.create_user(username=username, email=email, password=password)
          user_profile = UserProfile.objects.create(user=user, profile_picture=profile_picture)
          if profile_picture:
            user.profile_picture = profile_picture  # Save profile picture
          user.save()
          user_profile.save()
          return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=400)
    

class UserLoginView(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class PostView(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    parser_classes = (MultiPartParser, FormParser)
    def get_serializer_context(self):
        return {'request': self.request} 
    # Custom action to get posts by username
    @action(detail=False, methods=['get'], url_path='user-posts')
    def get_posts_by_username(self, request):
        username = request.query_params.get('username')
        if not username:
            return Response({'error': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.filter(username=username).first()
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        posts = Post.objects.filter(username=user)
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
         # Log the incoming request data
        print("Request data:", request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=201) 
    
class ArticlesView(viewsets.ModelViewSet):
    serializer_class = ArticlesSerializer
    queryset = Articles.objects.all()
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        serializer.save(username=self.request.user)
  

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    def get(self, request, user_id):
        user = User.objects.get(id=user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data)

class BirdView(viewsets.ModelViewSet):
    serializer_class = BirdSerializer
    queryset = BirdDetails.objects.all()





bird_names = [
    "Black_footed_Albatross",
    "Laysan_Albatross",
    "Sooty_Albatross",
    "Groove_billed_Ani",
    "Crested_Auklet",
    "Least_Auklet",
    "Parakeet_Auklet",
    "Rhinoceros_Auklet",
    "Brewer_Blackbird",
    "Red_winged_Blackbird",
    "Rusty_Blackbird",
    "Yellow_headed_Blackbird",
    "Bobolink",
    "Indigo_Bunting",
    "Lazuli_Bunting",
    "Painted_Bunting",
    "Cardinal",
    "Spotted_Catbird",
    "Gray_Catbird",
    "Yellow_breasted_Chat",
    "Eastern_Towhee",
    "Chuck_will_Widow",
    "Brandt_Cormorant",
    "Red_faced_Cormorant",
    "Pelagic_Cormorant",
    "Bronzed_Cowbird",
    "Shiny_Cowbird",
    "Brown_Creeper",
    "American_Crow",
    "Fish_Crow",
    "Black_billed_Cuckoo",
    "Mangrove_Cuckoo",
    "Yellow_billed_Cuckoo",
    "Gray_crowned_Rosy_Finch",
    "Purple_Finch",
    "Northern_Flicker",
    "Acadian_Flycatcher",
    "Great_Crested_Flycatcher",
    "Least_Flycatcher",
    "Olive_sided_Flycatcher",
    "Scissor_tailed_Flycatcher",
    "Vermilion_Flycatcher",
    "Yellow_bellied_Flycatcher",
    "Frigatebird",
    "Northern_Fulmar",
    "Gadwall",
    "American_Goldfinch",
    "European_Goldfinch",
    "Boat_tailed_Grackle",
    "Eared_Grebe",
    "Horned_Grebe",
    "Pied_billed_Grebe",
    "Western_Grebe",
    "Blue_Grosbeak",
    "Evening_Grosbeak",
    "Pine_Grosbeak",
    "Rose_breasted_Grosbeak",
    "Pigeon_Guillemot",
    "California_Gull",
    "Glaucous_winged_Gull",
    "Heermann_Gull",
    "Herring_Gull",
    "Ivory_Gull",
    "Ring_billed_Gull",
    "Slaty_backed_Gull",
    "Western_Gull",
    "Anna_Hummingbird",
    "Ruby_throated_Hummingbird",
    "Rufous_Hummingbird",
    "Green_Violetear",
    "Long_tailed_Jaeger",
    "Pomarine_Jaeger",
    "Blue_Jay",
    "Florida_Jay",
    "Green_Jay",
    "Dark_eyed_Junco",
    "Tropical_Kingbird",
    "Gray_Kingbird",
    "Belted_Kingfisher",
    "Green_Kingfisher",
    "Pied_Kingfisher",
    "Ringed_Kingfisher",
    "White_breasted_Kingfisher",
    "Red_legged_Kittiwake",
    "Horned_Lark",
    "Pacific_Loon",
    "Mallard",
    "Western_Meadowlark",
    "Hooded_Merganser",
    "Red_breasted_Merganser",
    "Mockingbird",
    "Nighthawk",
    "Clark_Nutcracker",
    "White_breasted_Nuthatch",
    "Baltimore_Oriole",
    "Hooded_Oriole",
    "Orchard_Oriole",
    "Scott_Oriole",
    "Ovenbird",
    "Brown_Pelican",
    "White_Pelican",
    "Western_Wood_Pewee",
    "Sayornis",
    "American_Pipit",
    "Whip_poor_Will",
    "Horned_Puffin",
    "Common_Raven",
    "White_necked_Raven",
    "American_Redstart",
    "Geococcyx",
    "Loggerhead_Shrike",
    "Great_Grey_Shrike",
    "Baird_Sparrow",
    "Black_throated_Sparrow",
    "Brewer_Sparrow",
    "Chipping_Sparrow",
    "Clay_colored_Sparrow",
    "House_Sparrow",
    "Field_Sparrow",
    "Fox_Sparrow",
    "Grasshopper_Sparrow",
    "Harris_Sparrow",
    "Henslow_Sparrow",
    "Le_Conte_Sparrow",
    "Lincoln_Sparrow",
    "Nelson_Sharp_tailed_Sparrow",
    "Savannah_Sparrow",
    "Seaside_Sparrow",
    "Song_Sparrow",
    "Tree_Sparrow",
    "Vesper_Sparrow",
    "White_crowned_Sparrow",
    "White_throated_Sparrow",
    "Cape_Glossy_Starling",
    "Bank_Swallow",
    "Barn_Swallow",
    "Cliff_Swallow",
    "Tree_Swallow",
    "Scarlet_Tanager",
    "Summer_Tanager",
    "Arctic_Tern",
    "Black_Tern",
    "Caspian_Tern",
    "Common_Tern",
    "Elegant_Tern",
    "Forsters_Tern",
    "Least_Tern",
    "Green_tailed_Towhee",
    "Brown_Thrasher",
    "Sage_Thrasher",
    "Black_capped_Vireo",
    "Blue_headed_Vireo",
    "Philadelphia_Vireo",
    "Red_eyed_Vireo",
    "Warbling_Vireo",
    "White_eyed_Vireo",
    "Yellow_throated_Vireo",
    "Bay_breasted_Warbler",
    "Black_and_white_Warbler",
    "Black_throated_Blue_Warbler",
    "Blue_winged_Warbler",
    "Canada_Warbler",
    "Cape_May_Warbler",
    "Cerulean_Warbler",
    "Chestnut_sided_Warbler",
    "Golden_winged_Warbler",
    "Hooded_Warbler",
    "Kentucky_Warbler",
    "Magnolia_Warbler",
    "Mourning_Warbler",
    "Myrtle_Warbler",
    "Nashville_Warbler",
    "Orange_crowned_Warbler",
    "Palm_Warbler",
    "Pine_Warbler",
    "Prairie_Warbler",
    "Prothonotary_Warbler",
    "Swainson_Warbler",
    "Tennessee_Warbler",
    "Wilson_Warbler",
    "Worm_eating_Warbler",
    "Yellow_Warbler",
    "Northern_Waterthrush",
    "Louisiana_Waterthrush",
    "Bohemian_Waxwing",
    "Cedar_Waxwing",
    "American_Three_toed_Woodpecker",
    "Pileated_Woodpecker",
    "Red_bellied_Woodpecker",
    "Red_cockaded_Woodpecker",
    "Red_headed_Woodpecker",
    "Downy_Woodpecker",
    "Bewick_Wren",
    "Cactus_Wren",
    "Carolina_Wren",
    "House_Wren",
    "Marsh_Wren",
    "Rock_Wren",
    "Winter_Wren",
    "Common_Yellowthroat"
]
