package edu.kh.project.sse.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.project.sse.dto.Notification;

@Mapper
public interface SseMapper {

  // 알림 삽입
  int insertNotification(Notification notification);

  /**
   * 알림을 받아야하는 회원의 번호 + 안읽은 알람 개수 조회
   * @param notificationNo
   * @return map
   */
  Map<String, Object> selectReceiveMember(int notificationNo);
  
}
