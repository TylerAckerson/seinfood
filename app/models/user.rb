# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  address         :text             not null
#  city            :text             default("New York City")
#  state           :text             default("New York")
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  name            :text             default("Default User"), not null
#

class User < ActiveRecord::Base
  validates :email, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :orders
  has_many :restaurants, through: :orders

  after_initialize :ensure_session_token
  before_validation :set_defaults

  attr_reader :password

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)

    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    save!
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

  def set_defaults
    self.city = "New York City" if self.city.empty?
    self.state = "New York" if self.state.empty?
  end
end
