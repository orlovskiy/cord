var current_object;
window.onload = function(){

document.getElementsByClassName('menu_button_wrapper')[0].style.display = "none";
	var origin = window.origin = {};
	origin.visualisation = document.getElementById('nodes');
	var createBaseNode = document.getElementById('createBaseNode');
	origin.storage = {};
	origin.all_nodes={}
	createBaseNode.onclick = function(){
		var new_Node = new Container(origin,origin);
		new_Node.level = 0;
		new_Node.position = 0;
		new_Node.id = 'node 0'
		new_Node.name = 'node 0';
		origin.all_nodes[new_Node.name] = new_Node
		origin.storage[new_Node.name] = new_Node;
		new_Node.drawSelf(origin);
		createBaseNode.style.display = "none";
	}

}
function addNode(parent){
		var newNode = new Container(parent,parent.BaseNode);
		newNode.position = Object.keys(parent.storage).length;
		newNode.id = parent.id +':'+ newNode.position;
		newNode.name = newNode.id;
		parent.storage[newNode.id] = newNode;
		origin.all_nodes[newNode.id] = newNode;
		newNode.drawSelf(parent);
	}
	function removeNode(node,parent){
		node.container.remove();
		delete parent.storage[node.id];
		delete origin.all_nodes[node.id];
		console.log(parent.storage);
	}


function updateNode(nodeView){
	try{
	childNodesList = nodeView.childNodes[3].childNodes;
	var parentNode = origin.all_nodes[nodeView.id]
	parentNode.storage = {};
	for (var i = 0; i<childNodesList.length;i++){
		var childNode = origin.all_nodes[childNodesList[i].id];
		console.log(childNode)
		delete origin.all_nodes[childNode.id];
		childNode.view = childNodesList[i]
		childNode.id = parentNode.id+':'+i;
		childNode.level = parentNode.level+1;
		childNode.parent = parentNode;
		parentNode.storage[childNode.id] = childNode;
		origin.all_nodes[childNode.id] = childNode;

		childNode.view.id = childNode.id;
		childNode.name = childNode.id;
		childNode.view.getElementsByClassName('nodeName')[0].value = childNode.id;
		if(typeof childNode.storage =='object'){
			updateNode(childNode.view)
		}else{
			continue
		}
	}
}catch(err){
	console.log('opa! '+ err)
}
}


function updateModelView(startNode,stopNode){
	updateNode(origin.all_nodes['node 0:1'].view);
	/*updateNode(startNode);*/
	console.log(origin.all_nodes['node 0'])
	
	
	
}






function drawSelf(parent){
		var current_object = this;
		var view = document.createElement('li');
		view.className = 'node-view';
		$(view).resizable({handles:'none',handles:'all'});
		var visualisation = document.createElement('ul');
		var nameField = document.createElement('input');
		var dragHandle = document.createElement('span');
		dragHandle.className = 'dragHandle';
		nameField.className = 'nodeName';
		nameField.setAttribute('placeholder',this.id);
		view.appendChild(dragHandle);
		view.appendChild(nameField);
		view.appendChild(visualisation);
		view.id = this.id
		nameField.value = this.name;
		nameField.onchange = function(){
			this.name = nameField.value
		}
		visualisation.className = 'container-node';
		current_object.view = view;
		current_object.visualisation = visualisation;
		var startNodeView;
		var stopNodeView;
		$(visualisation).sortable({connectWith:'.container-node',
			cancel:'.addNew',
			handle:'.dragHandle',
			start:function(event,ui){
				startNode = origin.all_nodes[ui.item[0].parentNode.parentNode.id];
				delete origin.all_nodes[ui.item[0].parentNode.parentNode.id].storage[ui.item[0].id];
				console.log(startNode)

			},
			stop: function( event, ui) {
				stopNode = origin.all_nodes[ui.item[0].parentNode.parentNode.id];
				var node = origin.all_nodes[ui.item[0].id];
				stopNode.storage[node.id] = node;
				node.parent = stopNode;
				node.level = stopNode.level+1;
				node.position = Object.keys(stopNode.storage).length-1;
				console.log(stopNode)
			/*	delete origin.all_nodes[stopNodeView.id].storage[ui.item[0].id]
				updateModelView(startNodeView,stopNodeView);*/
				/*console.log(origin.all_nodes[ui.item[0].parentNode.parentNode.id]);*/
				
				/*for(var i = 0; i<ui.item[0].parentNode.childNodes.length;i++){
					var node = origin.all_nodes[ui.item[0].parentNode.childNodes[i].id];
					oldName = ui.item[0].parentNode.childNodes[i].id;
					delete origin.all_nodes[oldName];
					console.log(ui.item[0].parentNode.childNodes[i].id);
					node.position = i;
					node.name = ui.item[0].parentNode.parentNode.id + ':' + node.position;
					ui.item[0].parentNode.childNodes[i].id = node.name;
					ui.item[0].parentNode.childNodes[i].getElementsByClassName('nodeName')[0].value = node.name;
					origin.all_nodes[node.name] = node;
					}*/
				}
			});
		

		/*var addNew = document.createElement('span');
		var span1 = document.createElement('span');
		span1.innerHTML = '+';
		var span2 = document.createElement('span');
		span2.id = 'clearfix2';
		addNew.appendChild(span1);
		addNew.appendChild(span2);*/
		var addNew = document.getElementsByClassName('menu_button_wrapper')[0].cloneNode(true);
		addNew.style.display = "";
		addNew.className += " addNew";





		addNew.oncontextmenu = function ()
		{
		    return false;     // cancel default menu
		}
		addNew.getElementsByClassName('pie_icon')[0].oncontextmenu = function(){
				addNew.getElementsByClassName('pie')[0].style['transform'] = "scale(2.5,2.5)";
				addNew.getElementsByClassName('pie')[0].style.zIndex = "21";
				addNew.getElementsByClassName('description')[0].style.display = "inline-block";
				addNew.getElementsByClassName('pie_icon')[0].style.boxShadow = "0px 0px 10px 5px rgba(0,0,0,0.4)";
			}
			addNew.getElementsByClassName('pie')[0].onmouseleave = function(){
				addNew.getElementsByClassName('pie')[0].style['transform'] = "scale(1,1)";
				addNew.getElementsByClassName('description')[0].style.display = "none";
				addNew.getElementsByClassName('pie_icon')[0].style.boxShadow = "none";
			}
			addNew.getElementsByClassName('slice')[0].onmouseenter = function(){
				addNew.getElementsByClassName('slice')[addNew.getElementsByClassName('slice').length-1].style.zIndex = "-2";
			}
			addNew.getElementsByClassName('slice')[0].onmouseleave = function(){
				addNew.getElementsByClassName('slice')[addNew.getElementsByClassName('slice').length-1].style.zIndex = "6";
			}
			$(addNew).find('.slice').mouseenter(function(){
				$(addNew).find('.description').text($(this).text());
			})


			






				view.appendChild(addNew);
				
				addNew.getElementsByClassName('pie_icon')[0].onclick = function(){
					addNode(current_object,current_object.BaseNode);

				}
				addNew.getElementsByClassName('remove_all')[0].onclick = function(){
				removeNode(current_object,current_object.parent);
			}

				this.parent.visualisation.appendChild(view);
			}	

function Default_node(name,level,type,quantity,description){
	this.name = name;
	this.type = type;
}

function Container(parent,BaseNode){
	this.name = this.name;
	this.id = this.id;
	this.level = parent.level+1;
	this.position = this.position;
	this.BaseNode = BaseNode;
	this.parent = parent;
	Default_node.call(this,arguments);
	this.storage = {};
	this.addNode = addNode;
	this.drawSelf = drawSelf;
	this.removeNode = removeNode;
}

function Subject(weight, length, width, height){
	Default_node.call(this,arguments);
	this.draw() = function(){

	}
}

