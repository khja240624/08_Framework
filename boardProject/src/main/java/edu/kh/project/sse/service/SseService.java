package edu.kh.project.sse.service;

import java.util.Map;

import edu.kh.project.sse.dto.Notification;

public interface SseService {

  /** 알림 삽입 후 알림 받을 회원 번호 + 알림 개수 반환
   */
  Map<String, Object> insertNotification(Notification notification);
  
}
