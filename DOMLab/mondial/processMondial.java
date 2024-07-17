package mondial;

import javax.xml.parsers.*;

import org.w3c.dom.*;

import javax.xml.transform.*;
import javax.xml.transform.dom.*;
import javax.xml.transform.stream.*;
import java.text.NumberFormat;

import java.io.*;

public class processMondial {
	static final String inputFile = "mondial/mondial-sample.xml";  // 나중에 "mondial/mondial.xml"로 변경해서 테스트 
	static final String outputFile = "mondial/result.xml";
	
	// 대륙별 인구 계산 및 출력을 위해 대륙 이름들을 저장한 배열 정의
    static final String continent[] = new String[] { "Africa", "America", "Asia", "Australia", "Europe" };
    
    static long pop[] = new long[5];  // 각 대륙의 인구 값을 저장할 배열 선언(대륙의 순서는 위 배열과 동일)
 
	public static void main(String[] args) throws Exception {
		// DOM 파서 생성
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		factory.setIgnoringElementContentWhitespace(true);
		DocumentBuilder builder = factory.newDocumentBuilder();

		// XML 문서 파싱하기
		Document document = builder.parse(inputFile);

		Element mondial = document.getDocumentElement();
		
		// 대륙별 인구를 계산 및 출력 (3번)
		computePopulationsOfContinents(mondial);					
		
		// 종교별 신자 수를 계산 및 출력 (4번)
		// computeBelieversOfReligions(mondial);	
				
		// 국가별 정보 검색 및 출력 (1번)
		processCountries1(mondial);	
		
		// 국가별 정보 검색 및 DOM 트리 수정 (2번)
		processCountries2(mondial);	
		
		// 처리 결과 출력을 위한 변환기 생성
		TransformerFactory tf = TransformerFactory.newInstance();
		Transformer transformer = tf.newTransformer();

		// 출력 포맷 설정: XML 선언과 문서 유형 선언 내용 설정하기
		transformer.setOutputProperty(OutputKeys.ENCODING, "utf-8");
		// transformer.setOutputProperty(OutputKeys.DOCTYPE_SYSTEM,
		// "mondial.dtd");
		transformer.setOutputProperty(OutputKeys.INDENT, "yes");
		transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "2");
		
		// DOMSource 객체 생성
		DOMSource source = new DOMSource(document);

		// StreamResult 객체 생성
		StreamResult result = new StreamResult(new File(outputFile));

		// 파일로 저장하기
		transformer.transform(source, result);
		
		System.out.println();
		System.out.println(outputFile + "로 저장되었습니다.");
	}

	public static void processCountries1(Element mondial) { // 국가별 정보 검색 및 출력 (1번)
		for (Node ch = mondial.getFirstChild(); ch != null; ch = ch.getNextSibling()) {
			if (ch.getNodeName().equals("country")) {
				Node name = ch.getFirstChild(); // <name>...</name>
				String countryName = name.getFirstChild().getNodeValue();
				System.out.println(countryName);
				
				//NamedNodeMap mp = ch.getAttributes(); // 현재 ch가 가리키는 모든
				//mp.getNamedItem("area").getNodeValue();
				
				String area = ((Element)ch).getAttribute("area");
				System.out.println("면적: " + area);
				
				Node population = name.getNextSibling();
				String populationName = population.getFirstChild().getNodeValue();
				System.out.println("인구: " + populationName);
							
				String capitalId = ((Element)ch).getAttribute("capital");
				if (!capitalId.isEmpty()) {
					Element capital = ch.getOwnerDocument().getElementById(capitalId); // document 호출
					String capitalName = capital.getFirstChild().getFirstChild().getNodeValue();
					System.out.println("수도의 이름: " + capitalName);
				}
			}
		}				
	} 
	
	public static void processCountries2(Element mondial) { // 국가별 정보 검색 및 DOM 트리 수정 (2번)
		for (Node ch = mondial.getFirstChild(); ch != null; ch = ch.getNextSibling()) {
			if (ch.getNodeName().equals("country")) {
				Node name = ch.getFirstChild(); // <name>...</name>
				
				Node population = name.getNextSibling();
				Node code = ch.getOwnerDocument().createElement("code");
				Text cd = code.getOwnerDocument().createTextNode(((Element)ch).getAttribute("car_code"));
				//Text cd =  ch.getOwnerDocument().setTextContent("car_code");
				code.appendChild(cd);
				ch.insertBefore(code, population); //insertBefore(, 뒤에 올 태그) 사용
				
				/*
				Node nextSibling = population.getNextSibling();
	            while (nextSibling != null && !nextSibling.getNodeName().equals("city")) {
	                Node toRemove = nextSibling;
	                nextSibling = nextSibling.getNextSibling();
	                ch.removeChild(toRemove);
	            }
	            NodeList cities = ((Element)ch).getElementsByTagName("city");
	            for (int i = 0; i < cities.getLength(); i++) {
	                Node city = cities.item(i);
	                ch.appendChild(city);
	                
	                NamedNodeMap cityAttributes = city.getAttributes();
	                for (int j = cityAttributes.getLength() - 1; j >= 0; j--) {
	                    Node attribute = cityAttributes.item(j);
	                    if (!attribute.getNodeName().equals("id")) {
	                        cityAttributes.removeNamedItem(attribute.getNodeName());
	                    }
	                }
	            }
	            */
				Node currentNode = population.getNextSibling();
	            while (currentNode != null && !currentNode.getNodeName().equals("city")) {
	                Node nextNode = currentNode.getNextSibling();
	                ch.removeChild(currentNode);
	                currentNode = nextNode;
	            }
	            
	            // city가 없는 경우에 대한 처리
	            if (((Element)ch).getElementsByTagName("city").getLength() == 0) {
	                // 처리할 것이 없으므로 따로 추가적인 코드가 필요하지 않음
	            }
	            
	            // 2-5 <country>의 모든 속성들을 삭제
	            NamedNodeMap countryAttributes = ch.getAttributes();
	            for (int i = countryAttributes.getLength() - 1; i >= 0; i--) {
	                countryAttributes.removeNamedItem(countryAttributes.item(i).getNodeName());
	            }
		        
				/*
				String capital = ((Element)ch).getAttribute("capital");
		        if (!capital.isEmpty()) {
		            Node city = ch.getOwnerDocument().getElementById(capital);
		            if (city != null) {
		                Node parent = city.getParentNode();
		                parent.removeChild(city);
		            }
		        }
		        Node sibling = population.getNextSibling();
	            while (sibling != null) {
	                Node nextSibling = sibling.getNextSibling();
	                ch.removeChild(sibling);
	                sibling = nextSibling;
	            }
	            if (!capital.isEmpty()) {
	                Node city = ch.getOwnerDocument().getElementById(capital);
	                if (city != null) {
	                    Node clonedCity = city.cloneNode(true);
	                    ch.appendChild(clonedCity);
	                    NamedNodeMap attributes = clonedCity.getAttributes();
	                    for (int j = 0; j < attributes.getLength(); j++) {
	                        Node attribute = attributes.item(j);
	                        if (!attribute.getNodeName().equals("id")) {
	                            attributes.removeNamedItem(attribute.getNodeName());
	                        }
	                    }
	                }
	            }
	            NamedNodeMap attributes = ch.getAttributes();
	            for (int j = 0; j < attributes.getLength(); j++) {
	                attributes.removeNamedItem(attributes.item(j).getNodeName());
	            }*/
	            
			} else {
	            // 2-6 <country> 외의 다른 노드들을 모두 삭제.
	            mondial.removeChild(ch);
	        }
		}	
	} 
	
	public static void computePopulationsOfContinents(Node mondial) { // 대륙별 인구를 계산 및 출력 (3번)
		NodeList countryList = mondial.getChildNodes();
        for (int i = 0; i < countryList.getLength(); i++) {
            Node country = countryList.item(i); // 각 <country> element에 대해
            if (country.getNodeName().equals("country")) {
                long population = 0;
                NodeList countryChildren = country.getChildNodes();
                for (int j = 0; j < countryChildren.getLength(); j++) {
                    Node child = countryChildren.item(j);
                    if (child.getNodeName().equals("population")) {
                        population = Long.parseLong(child.getTextContent()); // population의 값을 구해 long 타입으로 변환
                    }
                }
                
                double maxPercentage = 0; //   미리 percentage의 max 값을 저장할 변수와 percentage가 max일 때의 continent 값을 저장할 변수를
                String largestContinent = "";
                for (int j = 0; j < countryChildren.getLength(); j++) { // <encompassed>가 발견될 때까지(!) 다음 형제들로 이동
                    Node child = countryChildren.item(j);
                    if (child.getNodeName().equals("encompassed")) {  // 이후 발견되는 <encompassed>들에 속한 percentage 속성 값들의 최대 값을 구하는 알고리즘 구현
                        double percentage = Double.parseDouble(child.getAttributes().getNamedItem("percentage").getNodeValue());  // percentage 값은 Double 타입으로 변환하여 저장 및 비교
                        if (percentage > maxPercentage) { // 선언하고 두 변수 값을 함께 update함
                            maxPercentage = percentage;
                            largestContinent = child.getAttributes().getNamedItem("continent").getNodeValue();
                        }
                    }
                }
                String continent = largestContinent;  //   단, 최대 값에 대응되는 continent 값을 구해야 하므로 
                
                switch (continent) { // switch - case 구조를 이용해서, 위에서 구한 continent 값에 따라 
                case "africa": // 대문자로 하니까 오류남;;
                    pop[0] += population;
                    break;
                case "america":
                    pop[1] += population;
                    break;
                case "asia":
                    pop[2] += population;
                    break;
                case "australia":
                    pop[3] += population;
                    break;
                case "europe":
                    pop[4] += population; // 위 22행에 선언된 pop[]의 해당 원소 값에 population 값을 누적시킴
                    break; //   주의: 각 case 끝에 반드시 break 필요!
                }
            }
        }		
		// 계산된 각 대륙의 인구를 출력
		printPopulationsOfContinents();
	}
	public static void printPopulationsOfContinents() {
		long total = 0;
		NumberFormat formatter = NumberFormat.getInstance();
		
		System.out.println("Populations of the Continents");
        System.out.println("-----------------------------");
        for (int i = 0; i < continent.length; i++) {
            System.out.println(continent[i] + "의 인구: " + formatter.format(pop[i]) + "명");
            total += pop[i];
        }
        System.out.println("-----------------------------");
        System.out.println("합계: " + formatter.format(total) + "명");
	
	}	
}