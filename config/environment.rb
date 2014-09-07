# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
I18n.enforce_available_locales = false
Threedact::Application.initialize!
