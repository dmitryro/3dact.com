
class Job
  include Mongoid::Document
  field :title, type: String
  field :published, type: Date
  field :expires, type: Date
  mount_uploader :avatar, AvatarUploader
  field :description, type: String
end
