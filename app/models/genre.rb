class Genre
  include Mongoid::Document
  field :name, type: String
  mount_uploader :avatar, AvatarUploader
end
