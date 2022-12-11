package ports

import "Dona/backend/internal/core/domain/entity"

type Service interface {
	CreateNotification(notification entity.Notification) (interface{}, error)
	GetNotificationStatus(ref string) (interface{}, error)
	GetNotificationByRef(ref string) (interface{}, error)
	GetNotificationList(page string) (interface{}, error)
}