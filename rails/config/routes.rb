Rails.application.routes.draw do
  post 'commendation/vote'
  post 'commendation/new'
  post 'commendation/approve'
  get 'commendation/approved'
  get 'commendation/unapproved'

  post'report/new'
  post 'report/resolve'
  get 'report/resolved'
  get 'report/all'

  post 'user/new'
  post 'user/login'

  post 'classroom/new'
  post 'classroom/add_user'
  post 'classroom/add_commendation'
end
