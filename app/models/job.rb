
class Job
  include Mongoid::Document
  field :title, type: String
  field :published, type: DateTime
  field :expires, type: DateTime
  mount_uploader :avatar, AvatarUploader
  field :description, type: String
end
