import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Injectable, OnInit} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject} from 'rxjs';

/**
 * Node for to-do item
 */
export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

/**
 * The Json object for to-do list data.
 */
const TREE_DATA = {
    'ABASTECIMIENTO DE AGUA': {
      'Plantas de Agua Potable': [],
      'Red primaria de agua potable': [],
      'Pozos': [],
      'Reservorios': []
    },
    'ABASTECIMIENTO DE ALIMENTOS': {
      'Sedes de instituciones de ayuda alimentaria': [],
      'Mercados mayoristas': [],
      'Mercados de distribución': [],
      'Supermercados': []
    },
    'ABASTECIMIENTO DE ENERGÍA': {
      'Terminales': [],
      'Refinerías': [],
      'Empresas distribuidoras de combustible': [],
      'Estaciones de servicio de Lima y Callao': []
    },
    'ATENCIÓN MÉDICA': {
      'Centro de decisión': [],
      'Establecimientos de salud': [],
      'Áreas de expansión': [],
      'Almacenes de insumos médicos y medicamentos': []
    },
    'TRANSPORTE Y VIALIDAD': {
      'Red vial general': [],
      'Red vial principal': [],
      'Puentes': [],
      'Pasos a desnivel': []
    },
    'ACCESIBILIDAD': {
      'Zonas de accesibilidad': [],
      'Puntos de congestión': []
    },
    'TELECOMUNICACIONES': {
      'Estudios de radio': [],
      'Estudios de televisión': [],
      'Plantas de Emisoras de radio': [],
      'Plantas de televisión': []
    },
};

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] {
    return this.dataChange.value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(TREE_DATA, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: {[key: string]: any}, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string) {
    if (parent.children) {
      parent.children.push({item: name} as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
}


export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}


@Component({
  selector: 'app-map-layers',
  templateUrl: './map-layers.component.html',
  styleUrls: ['./map-layers.component.scss'],
  providers: [ChecklistDatabase],
})
export class MapLayersComponent implements OnInit {

  task: Task[] = [{
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'},
    ],
  }, 
  {
    name: 'ABASTECIMIENTO DE AGUA',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Plantas de Agua Potable', completed: false, color: 'primary'},
      {name: 'Red primaria de agua potable', completed: false, color: 'primary'},
      {name: 'Pozos', completed: false, color: 'primary'},
      {name: 'Reservorios', completed: false, color: 'primary'}
    ]
  },
  {
    name: 'ABASTECIMIENTO DE ALIMENTOS',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Sedes de instituciones de ayuda alimentaria', completed: false, color: 'primary'},
      {name: 'Mercados mayoristas', completed: false, color: 'primary'},
      {name: 'Mercados de distribución', completed: false, color: 'primary'},
      {name: 'Supermercados', completed: false, color: 'primary'}
    ]
  },
  {
    name: 'ABASTECIMIENTO DE ENERGÍA',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Terminales', completed: false, color: 'primary'},
      {name: 'Refinerías', completed: false, color: 'primary'},
      {name: 'Empresas distribuidoras de combustible', completed: false, color: 'primary'},
      {name: 'Estaciones de servicio de Lima y Callao', completed: false, color: 'primary'}
    ]
  },
  {
    name: 'ATENCIÓN MÉDICA',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Centro de decisión', completed: false, color: 'primary'},
      {name: 'Establecimientos de salud', completed: false, color: 'primary'},
      {name: 'Áreas de expansión', completed: false, color: 'primary'},
      {name: 'Almacenes de insumos médicos y medicamentos', completed: false, color: 'primary'}
    ]
  },
  {
    name: 'TRANSPORTE Y VIALIDAD',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Red vial general', completed: false, color: 'primary'},
      {name: 'Red vial principal', completed: false, color: 'primary'},
      {name: 'Puentes', completed: false, color: 'primary'},
      {name: 'Pasos a desnive', completed: false, color: 'primary'}
    ]
  },
  {
    name: 'ACCESIBILIDAD',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Zonas de accesibilidad', completed: false, color: 'primary'},
      {name: 'Puntos de congestión', completed: false, color: 'primary'}
    ]
  },
  {
    name: 'TELECOMUNICACIONES',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Estudios de radio', completed: false, color: 'primary'},
      {name: 'Estudios de televisión', completed: false, color: 'primary'},
      {name: 'Plantas de Emisoras de radio', completed: false, color: 'primary'},
      {name: 'Plantas de televisión', completed: false, color: 'primary'}
    ]
  },];

  allComplete: boolean = false;

  updateAllComplete(subtask: any) {
    this.allComplete = subtask != null && subtask.every(t => t.completed);
  }

  someComplete(subtask: any): boolean {
    return false;
    // if (subtask == null) {
    //   return false;
    // }
    // return subtask.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean, subtask: any) {
    this.allComplete = completed;
    if (subtask == null) {
      return;
    }
    subtask.forEach(t => (t.completed = completed));
  }



  
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

  constructor(private _database: ChecklistDatabase, private modalService: NgbModal) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren,
    );
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngOnInit(): void {
  }

  closeModal(){
    this.modalService.dismissAll();
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.item === node.item ? existingNode : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: TodoItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this._database.insertItem(parentNode!, '');
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: TodoItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this._database.updateItem(nestedNode!, itemValue);
  }
}

