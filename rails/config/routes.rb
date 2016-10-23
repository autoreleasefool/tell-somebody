Rails.application.routes.draw do
  post 'commendation/vote'
  post 'commendation/new'
  post 'commendation/approve'
  get 'commendation/approved'

  post'report/new'
  post 'report/resolve'

  post 'user/new'
  post 'user/login'

  post 'classroom/new'
  post 'classroom/add_user'
  post 'classroom/add_commendation'
end
