
from django.conf.urls import url, include
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from hfl.views import (
    LandingContentViewSet,
    AgentListingViewSet,
AboutPageViewSet,
    ListingImagesContentViewSet,
    ListView,
    ListingDetailView,
    ListMapView,
    OtherListingsView
)
from rest_framework import routers, serializers, viewsets
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'landing-content',  LandingContentViewSet)
router.register(r'agents', AgentListingViewSet)
router.register(r'about', AboutPageViewSet)
router.register(r'images', ListingImagesContentViewSet)

admin.site.site_header = 'HFL Administration'

urlpatterns = [
    url(r'^jet/', include('jet.urls', 'jet')),  # Django JET URLS
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'api/listings-all/', ListMapView.as_view()),
    url(r'api/other_listings/(?P<property_type>.+)/(?P<property_name>.+)/$', OtherListingsView.as_view()),
    url(r'api/listings/(?P<property_type>.+)/$', ListView.as_view()),
    url(r'api/listing_detail/(?P<name>.+)/$', ListingDetailView.as_view()),
    url(r'^landing', include('frontend.urls')),  # Default to frontend urls
    url(r'^estate_property', include('frontend.urls')),  # Default to frontend urls
    url(r'^land-listings', include('frontend.urls')),  # Default to frontend urls

]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
