package edu.kh.project.common;

import java.util.Arrays;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Test {
	public static void main(String[] args) {
		// http://localhost/board/2/2018 
		Scanner sc = new Scanner(System.in);
		
		System.out.print("주소 입력 : ");
		String input = sc.nextLine();
		
		// 1) split()
		String[] arr = input.split("/");
		System.out.println(Arrays.toString(arr));
		
		String result1 = "/" + arr[3] + "/" + arr[4];
		System.out.println(result1);
		
		
		// 2) substring()
		// http://localhost/board/2/2018 
		int start = input.indexOf("/board");
		int end   = input.lastIndexOf("/");
		
										// start 이상 end 미만
		String result2 = input.substring(start, end);
		System.out.println(result2);
		
		
		// 3) 정규표현식
		String regExp = "/board/[0-9]+";
		
		// 정규식이 적용된 자바 객체
		Pattern pattern = Pattern.compile(regExp);
		
		// input에서 정규식과 일치하는 부분을 찾아 저장하는 객체
		Matcher matcher = pattern.matcher(input);
		
		if(matcher.find()) { // 일치하는 부분을 찾은 경우
			String result3 = matcher.group();
			System.out.println(result3);
		}
		
		
		
	}
}
